import React, { useState } from "react";
import { filerMenu } from "../utils/supports";
import { NavLink } from "react-router-dom";

const Filter = () => {
  return (
    <div className=" flex items-start justify-start xl:items-center xl:justify-center overflow-x-scroll gap-12 pt-6 scrollbar-none">
      {filerMenu &&
        filerMenu.map((menu) => (
          <FilterButtons
            key={menu.id}
            label={menu.label}
            icon={menu.icon}
            to={menu.to}
          />
        ))}
    </div>
  );
};

export const FilterButtons = ({ label, icon, to }) => {
  const Icon = icon;
  const [active, setActive] = useState(false);

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        setActive(isActive);
      }}
    >
      <div
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full ${
          active && "bg-zinc-100"
        } cursor-pointer`}
      >
        <Icon
          className={`${active ? "text-emerald-400" : "text-primary"} text-lg`}
        />
        <p className="text-base text-primary">{label}</p>
      </div>
    </NavLink>
  );
};

export default Filter;
