class APIFetcher {
  constructor(url, options, useCors = false) {
    this.endpoint = (useCors ? "https://cors-anywhere.herokuapp.com/" : "") + url;
    this.options = options;
    this.cache = null;
  }

  async makeRequest() {
    if (this.cache !== null) return this.cache;
    const response =  await fetch(this.endpoint, this.options);
    this.cache = await response.json();
    return this.cache;
  }

  clearCache() {
    this.cache = null;
  }

  addParams(param) {
    if (this.options.method === "POST") {
      this.options.body += param;
    } else if (this.options.method === "GET") {
      this.endpoint += '&' + param;
    } else {
      throw new Error(`Can't add option to ${this.options.method}`);
    }
  }
}

const epicAPI = new APIFetcher("https://graphql.epicgames.com/graphql", {
  method: 'POST',
  body: "{\"query\":\"\\n          query promotionsQuery($namespace: String!, $country: String!, $locale: String!) {\\n            Catalog {\\n              catalogOffers(namespace: $namespace, locale: $locale, params: {category: \\\"freegames\\\", country: $country, sortBy: \\\"effectiveDate\\\", sortDir: \\\"asc\\\"}) {\\n                elements {\\n                  title\\n                  description\\n                  id\\n                  namespace\\n                  categories {\\n                    path\\n                  }\\n                  linkedOfferNs\\n                  linkedOfferId\\n                  keyImages {\\n                    type\\n                    url\\n                  }\\n                  productSlug\\n                  promotions {\\n                    promotionalOffers {\\n                      promotionalOffers {\\n                        startDate\\n                        endDate\\n                        discountSetting {\\n                          discountType\\n                          discountPercentage\\n                        }\\n                      }\\n                    }\\n                    upcomingPromotionalOffers {\\n                      promotionalOffers {\\n                        startDate\\n                        endDate\\n                        discountSetting {\\n                          discountType\\n                          discountPercentage\\n                        }\\n                      }\\n                    }\\n                  }\\n                }\\n              }\\n            }\\n          }\\n        \",\"variables\":{\"namespace\":\"epic\",\"country\":\"FR\",\"locale\":\"en-US\"}}",
  headers: {
    "Content-Type": "application/json"
  }
}, true);

const humbleAPI = new APIFetcher("https://www.humblebundle.com/store/api/search?sort=discount&filter=onsale&hmb_source=store_navbar&request=1", {
  method: 'GET',
  headers: {
    "Content-Type": "application/json"
  }
}, true);

epicAPI.makeRequest().then(d => console.log(d));
humbleAPI.makeRequest().then(d => console.log(d));