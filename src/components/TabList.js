import React from "react";

function TabList({ list, index }) {
  const BarPosition = 84 + 50 * index;

  return (
    <div className="TabList content-block1 position-relative">
      <div className="tab-bar" style={{ top: `${BarPosition}px` }} />
      {list?.map((item) => (
        <p>{item.label}</p>
      ))}
    </div>
  );
}

export default TabList;
