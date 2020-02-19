const data = {
  corsBypassUrl: "https://cors-anywhere.herokuapp.com/",
  epic: {
    method: 'POST',
    endpoint: "https://graphql.epicgames.com/graphql",
    query: "{\"query\":\"\\n          query promotionsQuery($namespace: String!, $country: String!, $locale: String!) {\\n            Catalog {\\n              catalogOffers(namespace: $namespace, locale: $locale, params: {category: \\\"freegames\\\", country: $country, sortBy: \\\"effectiveDate\\\", sortDir: \\\"asc\\\"}) {\\n                elements {\\n                  title\\n                  description\\n                  id\\n                  namespace\\n                  categories {\\n                    path\\n                  }\\n                  linkedOfferNs\\n                  linkedOfferId\\n                  keyImages {\\n                    type\\n                    url\\n                  }\\n                  productSlug\\n                  promotions {\\n                    promotionalOffers {\\n                      promotionalOffers {\\n                        startDate\\n                        endDate\\n                        discountSetting {\\n                          discountType\\n                          discountPercentage\\n                        }\\n                      }\\n                    }\\n                    upcomingPromotionalOffers {\\n                      promotionalOffers {\\n                        startDate\\n                        endDate\\n                        discountSetting {\\n                          discountType\\n                          discountPercentage\\n                        }\\n                      }\\n                    }\\n                  }\\n                }\\n              }\\n            }\\n          }\\n        \",\"variables\":{\"namespace\":\"epic\",\"country\":\"FR\",\"locale\":\"en-US\"}}"
  },
  humble: {
    method: 'GET',
    endpoint: "https://www.humblebundle.com/store/api/search?sort=discount&filter=onsale&hmb_source=store_navbar&request=1",
  }
}

async function requestData(publisher) {
  const publisherData = data[publisher];
  if (publisherData === undefined) throw new Error("Publisher doesn't exist!");

  const options = {
    "method": publisherData.method,
    "body": publisherData.query,
    "headers": {
      "Content-type": "application/json"
    }
  };
  const response = await fetch(data.corsBypassUrl + publisherData.endpoint, options);
  return await response.json();
}

requestData('epic').then(d => console.log(d));
requestData('humble').then(d => console.log(d));