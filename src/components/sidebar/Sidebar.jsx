import { useState } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Person as PersonIcon,
  Category as CategoryIcon,
  ShoppingBasket as ShoppingBasketIcon,
  BarChart,
  RequestQuote,
} from "@mui/icons-material";

const Sidebar = () => {
  const [submenuStates, setSubmenuStates] = useState({
    user: false,
    product: false,
    category: false,
    statistical: false,
  });

  const handleToggle = (option) => {
    setSubmenuStates((prevStates) => ({
      ...prevStates,
      [option]: !prevStates[option],
    }));
  };

  const submenuData = [
    {
      title: "User",
      key: "user",
      icon: <PersonIcon />,
      items: [
        { label: "List", to: "/user" },
        { label: "Create User", to: "/user/create" },
        { label: "Update User", to: "/user/update" },
      ],
    },
    {
      title: "Product",
      key: "product",
      icon: <ShoppingBasketIcon />,
      items: [
        { label: "List", to: "/product" },
        { label: "Create Product", to: "/product/create" },
      ],
    },
    {
      title: "Category",
      key: "category",
      icon: <CategoryIcon />,
      items: [
        { label: "List category", to: "/category" },
        { label: "Create Category", to: "/create-category" },
        { label: "Update Category", to: "/category/update" },
      ],
    },
    {
      title: "Statistical",
      key: "statistical",
      icon: <BarChart />,
      items: [
        { label: "Statistical store", to: "/statistical" },
      ],
    },
    {
      title: "Order",
      key: "order",
      icon: <RequestQuote />,
      items: [
        { label: "List order", to: "/order?status=All" },
      ],
    },
  ];

  return (
    <div className="h-screen p-6 text-white bg-gray-800 w-80 sidebar">
      <h2 className="mb-6 text-xl font-bold text-center">Admin Panel</h2>
      <List component="nav">
        {submenuData.map((submenu) => (
          <div key={submenu.key}>
            <ListItem
              button
              onClick={() => handleToggle(submenu.key)}
              className="flex gap-4 px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
            >
              {submenu.icon}
              <ListItemText primary={submenu.title} />
              {submenuStates[submenu.key] ? (
                <ExpandMoreIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </ListItem>
            <Collapse
              in={submenuStates[submenu.key]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {submenu.items.map((item) => (
                  <ListItem
                    key={item.label}
                    button
                    component={Link}
                    to={item.to}
                    className="py-2 pl-8 list-disc rounded hover:bg-gray-700"
                  >
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
