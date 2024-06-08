class product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(item) {
    this.id = item.id;
    this.image = item.image;
    this.name = item.name;
    this.rating = item.rating;
    this.priceCents = item.priceCents;
    this.keywords = item.keywords;
  }
  geturl() {
    return `${this.image}`
  }
  getRatingImage() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  getPrice() {
    return ((this.priceCents / 100).toFixed(2))
  }
  ifAppliance() { return '' };
}
export function getProduct(itemId) {
  let matching;
  products.forEach((element) => {
    if (element.id === itemId) {
      matching = element;
    }
  })
  return matching;
}
class appliances extends product {
  #instructionsLink;
  #warrantylink;
  constructor(item) {
    super(item);
    this.#instructionsLink = "https://supersimple.dev/images/appliance-instructions.png";
    this.#warrantylink = "https://supersimple.dev/images/appliance-warranty.png";
  }
  getInstruction() {
    return this.#instructionsLink;
  }
  getWarranty() {
    return this.#warrantylink;
  }
  ifAppliance(item) {
    return `<a href="${this.getInstruction()}" target="_blank">Instructions</a>
      <a href="${this.getWarranty()}" target="_blank">Warranty</a>`
  }
}
function saving() {
  localStorage.setItem('Products', JSON.stringify(products));
}
export let products = [];
export async function loadProducts() {
  try {
    await fetch("https://supersimplebackend.dev/products").then((response) => {
      return response.json();
    }).then((data) => {
      products = data.map((item) => {
        if (item.keywords.find(keyword => keyword === "appliances")) {
          return new appliances(item);
        }
        else {
          return new product(item);
        }
      });
    })
  }
  catch {
    console.log("Error");
  }
}

export function getImage(itemproductId) {
  let product;
  let url;
  product = products.find(element => element.id === itemproductId);
  url = product.image;
  return url;
}
export function getName(itemproductId) {
  let name;
  name = products.find(element => element.id === itemproductId).name;
  return name;
}