const categories = [
    {
      type: "Electronics",
      subcategories: ["Phones", "Laptops", "Cameras", "Accessories"],
    },
    {
      type: "Fashion",
      subcategories: ["Men", "Women", "Shoes", "Bags"],
    },
    {
      type: "Home & Living",
      subcategories: ["Furniture", "Kitchen", "Decor", "Bedding"],
    },
    {
      type: "Books",
      subcategories: ["Fiction", "Non-Fiction", "Academic", "Children"],
    },
    {
      type: "Health & Beauty",
      subcategories: ["Skincare", "Makeup", "Personal Care", "Supplements"],
    },
  ];
  
  export default function MobileCategoryList() {
    return (
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.type}>
            <h3 className="font-semibold text-gray-800 mb-1">{cat.type}</h3>
            <ul className="pl-4 text-gray-600 text-sm space-y-1">
              {cat.subcategories.map((sub) => (
                <li key={sub} className="hover:text-blue-600 cursor-pointer">
                  {sub}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  