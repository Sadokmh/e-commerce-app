import { createSelector } from "reselect";


const shopSelector = (state) => state.shop;

export const selectShopCollections = createSelector(
  [shopSelector],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map((key) => collections[key]) : []
)

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectShopCollections], 
    (collections) => collections ? collections[collectionUrlParam] : null
  );

export const selectIsCollectionFetching = createSelector(
  [shopSelector],
  shop => shop.isFetching 
);

export const selectIsCollectionsLoaded = createSelector(
  [shopSelector],
  shop => !!shop.collections //shorthand to indicate if shop.collection is true or false, if it is null then returns false else it returns true
)
