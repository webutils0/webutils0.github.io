class APIFetcher {
  constructor(url, options, useCors = false) {
    this.endpoint = (useCors ? "https://cors-anywhere.herokuapp.com/" : "") + url;
    this.options = options;
    this.cache = null;
  }

  async makeRequest() {
    if (this.cache !== null) return this.cache;
    const response = await fetch(this.endpoint, this.options);
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

class Game {
  constructor(title, image, price, url) {
    this.title = title;
    this.image = image;
    this.price = price;
    this.url = url;
  }
}

// TODO: Handle upcoming free games ?
class EpicAPIFetcher extends APIFetcher {
  processData() {
    if (this.cache === null) return;
    const games = this.cache.data.Catalog.catalogOffers.elements;
    let freeGames = [],
      upcomingFreeGames = [];
    for (const game of games) {
      const g = new Game(
        game.title,
        game.keyImages.filter(i => i.type === "DieselStoreFrontWide")[0].url,
        0,
        `https://www.epicgames.com/store/fr/product/${game.productSlug}`
      );
      if (game.promotions.promotionalOffers.length !== 0) {
        freeGames.push(g);
      } else {
        upcomingFreeGames.push(g);
      }
    }
    return freeGames;
  }
}

class HumbleAPIFetcher extends APIFetcher {
  processData() {
    if (this.cache == null) return;
    const data = this.cache.results;
    let freeGames = [];
    for (const game of data) {
      const g = new Game(
        game.human_name,
        game.standard_carousel_image,
        game.current_price.amount,
        `https://www.humblebundle.com/store/${game.human_url}`
      );
      if (game.current_price.amount === 0) {
        freeGames.push(g);
      }
    }
    return freeGames;
  }
}

function createCard(game) {
  let div, p, img, span1, span2, a;
  div = document.createElement('div');
  div.className = "card";
  titleSpan = document.createElement('span');
  titleSpan.textContent = game.title;
  div.appendChild(titleSpan);
  a = document.createElement('a');
  a.href = game.url;
  a.target = "_blank";
  img = document.createElement('img');
  img.src = game.image;
  a.appendChild(img);
  div.appendChild(a);
  let test = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  bottomContainer = document.createElement('div');
  bottomContainer.className = "test";
  span1 = document.createElement('span');
  span1.className = "span1";
  span2 = document.createElement('span');
  span2.className = "span2";
  span1.textContent = test;
  span2.textContent = game.price.toFixed(2) + '€';
  bottomContainer.appendChild(span1);
  bottomContainer.appendChild(span2);
  div.appendChild(bottomContainer);
  return div;
}

const epicAPI = new EpicAPIFetcher("https://graphql.epicgames.com/graphql", {
  method: 'POST',
  body: "{\"query\":\"\\n          query promotionsQuery($namespace: String!, $country: String!, $locale: String!) {\\n            Catalog {\\n              catalogOffers(namespace: $namespace, locale: $locale, params: {category: \\\"freegames\\\", country: $country, sortBy: \\\"effectiveDate\\\", sortDir: \\\"asc\\\"}) {\\n                elements {\\n                  title\\n                  description\\n                  id\\n                  namespace\\n                  categories {\\n                    path\\n                  }\\n                  linkedOfferNs\\n                  linkedOfferId\\n                  keyImages {\\n                    type\\n                    url\\n                  }\\n                  productSlug\\n                  promotions {\\n                    promotionalOffers {\\n                      promotionalOffers {\\n                        startDate\\n                        endDate\\n                        discountSetting {\\n                          discountType\\n                          discountPercentage\\n                        }\\n                      }\\n                    }\\n                    upcomingPromotionalOffers {\\n                      promotionalOffers {\\n                        startDate\\n                        endDate\\n                        discountSetting {\\n                          discountType\\n                          discountPercentage\\n                        }\\n                      }\\n                    }\\n                  }\\n                }\\n              }\\n            }\\n          }\\n        \",\"variables\":{\"namespace\":\"epic\",\"country\":\"FR\",\"locale\":\"en-US\"}}",
  headers: {
    "Content-Type": "application/json"
  }
}, true);

const humbleAPI = new HumbleAPIFetcher("https://www.humblebundle.com/store/api/search?sort=discount&filter=onsale&hmb_source=store_navbar&request=1", {
  method: 'GET',
  headers: {
    "Content-Type": "application/json"
  }
}, true);

const container = document.getElementById('games-container');

epicAPI.makeRequest().then(d => {
  test = epicAPI.processData();
  console.log(d)
  console.log(test);
  for (const g of test) {
    console.log(g);
    container.appendChild(createCard(g));
  }
});

humbleAPI.makeRequest().then(d => {
  test = humbleAPI.processData();
  console.log(d)
  console.log(test);
  for (const g of test) {
    console.log(g);
    container.appendChild(createCard(g));
  }
});