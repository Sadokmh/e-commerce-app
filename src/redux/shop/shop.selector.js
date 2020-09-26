import { createSelector } from "reselect";

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

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
