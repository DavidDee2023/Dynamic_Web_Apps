const provinces = [
    "Western Cape",
    "Gauteng",
    "Northern Cape",
    "Eastern Cape",
    "KwaZulu-Natal",
    "Free State",
  ];
  const names = [
    "Ashwin",
    "Sibongile",
    "Jan-Hendrik",
    "Sifso",
    "Shailen",
    "Frikkie",
  ];
  
  names.forEach((name, index) => {
    const province = provinces[index];
    console.log(`${name}(${province})`);
  });
  
  const newProvince = provinces.map((province) => {
    return province.toUpperCase();
  });
  
  const letterCount = names.map((name) => {
    return name.length;
  });
  
  console.log(newProvince);
  console.log(letterCount);
  console.log(provinces.toSorted());
  
  const filteredProvince = provinces.filter((province) => {
    return !province.includes("Cape");
  });
  
  console.log(filteredProvince);
  
  const booleanS = names.map((name) => {
    return name.toUpperCase().includes("S");
  });
  
  console.log(booleanS);
  
  const newObject = names.reduce((obj, name, index) => {
    obj[name] = provinces[index];
    return obj;
  }, {});
  
  console.log(newObject);
  
  const products = [
    { product: "banana", price: "2" },
    { product: "mango", price: 6 },
    { product: "potato", price: " " },
    { product: "avocado", price: "8" },
    { product: "coffee", price: 10 },
    { product: "tea", price: "" },
  ];
  
  console.log(
    products.forEach((item) => {
      console.log(item.product);
    }),
    products.filter((item) => {
      return item.product.length > 5;
    }),
  
    products
      .filter((item) => item.price !== "" && !isNaN(item.price))
      .map((item) => parseInt(item.price))
      .reduce((total, item) => (isNaN(item) ? total : total + item), 0),
  
    products.reduce((ref, item) => ref + item.product + " ", ""),
    products.reduce((result) => {
      const prices = products
        .map((item) => parseInt(item.price))
        .filter((item) => !isNaN(item));
  
      const highest = Math.max(...prices);
      const lowest = Math.min(...prices);
  
      const itemHigh = products.find(
        (item) => parseFloat(item.price) === highest
      );
  
      const itemLow = products.find((item) => parseFloat(item.price) === lowest);
  
      result = `Highest: ${itemHigh.product}  Lowest: ${itemLow.product}`;
      return result;
    }, ""),
  
    Object.entries(products).reduce((ref, [key, value]) => {
      const key1 = "Name";
      const key2 = "Cost";
      ref[key] = { [key1]: value.product, [key2]: value.price };
      return ref;
    }, {})
  );