import { TranslationParams } from '@/../core/lib';
import { inject, onMounted, onUnmounted, ref } from 'vue';
import { TolgeeContext, TranslateFnProps } from './types';

export const useTranslate = () => {
  const tolgeeContext = inject('tolgeeContext') as TolgeeContext;

  const createTFunction = () => {
    return (
      keyOrProps: string | TranslateFnProps,
      ...params: (TranslationParams | boolean | string)[]
    ) => {
      let parameters: TranslationParams = undefined;
      let noWrap: boolean = undefined;
      let defaultValue = undefined;
      // allow user to pass object of params and make the code cleaner
      const key = typeof keyOrProps === 'object' ? keyOrProps.key : keyOrProps;
      if (typeof keyOrProps === 'object') {
        parameters = keyOrProps.parameters;
        noWrap = keyOrProps.noWrap;
        defaultValue = keyOrProps.defaultValue;
      } else {
        params.forEach((param) => {
          switch (typeof param) {
            case 'object':
              parameters = param;
              break;
            case 'boolean':
              noWrap = param;
              break;
            case 'string':
              defaultValue = param;
          }
        });
      }

      const result = tolgeeContext?.tolgee.instant({
        key: key,
        params: parameters,
        noWrap,
        defaultValue: defaultValue,
      });
      return result;
    };
  };

  const t = ref(createTFunction());

  let translationSub: any;
  let allTranslationsSub: any;
  onMounted(() => {
    const tolgee = tolgeeContext.tolgee;
    translationSub = tolgee.onTranslationChange.subscribe(() => {
      t.value = createTFunction();
    });
    allTranslationsSub = tolgee.onLangLoaded.subscribe(() => {
      t.value = createTFunction();
    });
  });

  onUnmounted(() => {
    translationSub?.unsubscribe();
    allTranslationsSub?.unsubscribe();
  });

  return t;
};
