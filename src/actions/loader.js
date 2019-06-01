export const SHOW_LOADER =  'SHOW_LOADER';

export const showLoader = (loaderVisibility) => ({
    type: SHOW_LOADER,
    payload: loaderVisibility
});
