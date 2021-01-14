import { compaignData } from "../../mockData/compaignJson";

export const getCompaignList = (req = {}) => {
  const { perPage = 10, page = 1, query = "" } = req;
  const indexFrom = (page - 1) * perPage;
  const indexTo = perPage * page;

  const filteredItems = compaignData.filter((compaign, index) => {
    return compaign?.name?.toLowerCase().includes(query.trim().toLowerCase());
  });
  const items = filteredItems.slice(indexFrom, indexTo);

  return {
    items,
    totalItems: filteredItems.length,
    totalPages: Math.ceil(filteredItems.length / perPage)
  };
};
