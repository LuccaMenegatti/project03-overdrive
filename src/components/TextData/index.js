import React from "react";
import { Data, Icon, Text, Name } from "./style";

const TextData = ({ data, name, className }) => {

  return (
    <Data className={className}>
      {/* <Icon className={`pi pi-${icon}`}></Icon> */}
      <Name>{name}</Name>
      <Text className="textData">{data}</Text>
    </Data>
  );
};

export default TextData;