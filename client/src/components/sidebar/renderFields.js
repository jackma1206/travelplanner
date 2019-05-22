import React from "react";
import sidetab from "./sidetab";

const renderFields = fields => {
  const list = fields.map((field, i) => {
    return (
      <sidetab name={field.name} href={field.href} key={i} icon={field.icon} />
    );
  });

  return list;
};

export default { renderFields };
