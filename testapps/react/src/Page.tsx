import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { T, useTranslate } from '@tolgee/react';
import { ChooseLanguage } from './ChooseLanguage';
import { Dialog, DialogContent } from '@mui/material';

export const Page: FunctionComponent = () => {
  const [disappeared, setDisappeared] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const t = useTranslate();

  function disappear() {
    setDisappeared(true);
  }

  return (
    <div>
      <ChooseLanguage />
      <h1>
        <T>sampleApp.hello_world!</T>
      </h1>
      <h1>
        <T>just_english</T>
      </h1>
      {!disappeared && (
        <button onClick={() => disappear()}>
          <T>disappears_on_click</T>
        </button>
      )}

      <div>
        <button onClick={() => setDialogOpen(true)}>
          <T>open_dialog</T>
        </button>
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent>
          <T strategy="TEXT_WRAP">text_in_dialog</T>
          <T strategy="TEXT_WRAP">text_in_dialog2</T>
        </DialogContent>
      </Dialog>

      <div title={t('sampleApp.hello_world!')}>
        <h3>Div with title</h3>
      </div>

      <div aria-label={t('sampleApp.hello_world!')}>
        <h3>Div with aria label</h3>
      </div>

      <div>
        <h3>Deprecated noWrap prop:</h3>
        <T noWrap>sampleApp.hello_world!</T>
      </div>

      <div>
        <h3>TEXT_WRAP strategy</h3>
        <T strategy="TEXT_WRAP">sampleApp.hello_world!</T>
      </div>

      <div>
        <h3>NO_WRAP strategy</h3>
        <T strategy="NO_WRAP">sampleApp.hello_world!</T>
      </div>

      <div>
        <h3>ELEMENT_WRAP strategy</h3>
        <T strategy="ELEMENT_WRAP">sampleApp.hello_world!</T>
      </div>

      <div>
        <h3>Default value</h3>
        <T strategy="ELEMENT_WRAP" keyName="unknown key">
          This is default!
        </T>
      </div>

      <div>
        <h3>Key is default value</h3>
        <T strategy="ELEMENT_WRAP">unknown key</T>
      </div>

      <div>
        <h3>Keys with defaults</h3>
        <p>
          <T keyName="with_default">This is default</T>
        </p>
        <p>{t({ key: 'key', defaultValue: 'This is default value!' })}</p>
      </div>

      <div>
        <h3>Same key multiplied in same element</h3>
        <div className="same-key-multiple">
          {t({ key: 'key', defaultValue: 'First one' })}
          <br />
          {t({ key: 'key', defaultValue: 'Second one' })}
        </div>
      </div>

      <div>
        <h3>Multiple keys in same element</h3>
        <div className="multiple-keys">
          {t({ key: 'key', defaultValue: 'First one' })}
          <br />
          {t({ key: 'key 2', defaultValue: 'Second one' })}
          <br />
          {t({ key: 'key 3', defaultValue: 'Third one' })}
          <br />
          {t({ key: 'key 3', defaultValue: 'Third one again' })}
        </div>
      </div>
    </div>
  );
};
