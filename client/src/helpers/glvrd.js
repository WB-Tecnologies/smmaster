/* eslint-disable import/prefer-default-export */
export const getProofread = (text, callback) => {
  window.glvrd.proofread(text, result => {
    if (result.status === 'ok') {
      return callback(result.fragments);
    }
  });

  if (!window.glvrd) {
    // eslint-disable-next-line no-console
    console.warn('Главред не загружен');
  }
};
