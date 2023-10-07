import { Category } from "@/model/category";
import { Product } from "@/model/product";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const getCategory = async () => {
  const categories: Category[] = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/sub-categories`, {
    next: {
      revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });

  return categories;
};

const AdminProduct = () => {
  const editorRef = useRef<unknown>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product>({
    name: "",
    image: "",
    slug: "",
    category: null as unknown as Category,
    price: 0,
    inventory: 0,
    description: "",
    isActive: true,
    sold: 0,
  });
  useEffect(() => {
    (async () => {
      const categories: Category[] = await getCategory();
      setCategories(categories);
      setProducts({ ...products, category: categories[0] });
    })();
  }, []);

  const handleCreate = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts({
          name: "",
          image: "",
          slug: "",
          category: categories[0],
          price: 0,
          inventory: 0,
          description: "",
          isActive: true,
          sold: 0,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="admin-product-overlay">
      <div className="admin-product">
        <table>
          <tbody>
            <tr>
              <td>Tên sản phẩm</td>
              <td>
                <input
                  placeholder="Tên sản phẩm"
                  type="text"
                  onChange={(e) => {
                    setProducts({ ...products, name: e.target.value });
                  }}
                  value={products?.name}
                />
              </td>
            </tr>
            <tr>
              <td>Hình ảnh</td>
              <td>
                <input
                  id="link-input"
                  type="text"
                  placeholder="Link hình ảnh"
                  onChange={(e) => {
                    setProducts({ ...products, image: e.target.value });
                  }}
                  value={products?.image}
                />
              </td>
            </tr>
            <tr>
              <td>Danh mục</td>
              <td>
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    const category = categories.find((cate) => cate._id === e.target.value);
                    if (category) {
                      setProducts({ ...products, category });
                    }
                  }}
                  value={products?.category?._id}
                >
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Giá</td>
              <td>
                <input
                  type="number"
                  onChange={(e) => {
                    setProducts({ ...products, price: Number(e.target.value) });
                  }}
                  value={products?.price}
                />
              </td>
            </tr>
            <tr>
              <td>Số lượng</td>
              <td>
                <input
                  type="number"
                  onChange={(e) => {
                    setProducts({ ...products, inventory: Number(e.target.value) });
                  }}
                  value={products?.inventory}
                />
              </td>
            </tr>
            <tr>
              <td>Mô tả</td>
              <td>
                <div className="editor">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onEditorChange={(e) => {
                      setProducts({ ...products, description: e });
                    }}
                    initialValue=" "
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "image",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic underlined forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help" +
                        "link image ",
                      content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <label htmlFor="link-input">{products?.image && <img src={products?.image} alt="" />}</label>
      </div>
      <div>
        <button
          onClick={() => {
            setProducts({
              name: "",
              image: "",
              slug: "",
              category: categories[0],
              price: 0,
              inventory: 0,
              description: "",
              isActive: true,
              sold: 0,
            });
          }}
        >
          Huỷ
        </button>
        <button
          onClick={() => {
            handleCreate();
          }}
        >
          Tạo mới
        </button>
      </div>
    </div>
  );
};

export default AdminProduct;
