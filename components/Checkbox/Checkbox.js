import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Checkbox() {
  const locale = useSelector((state) => state.royalfutReducer.locale);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <label>
        <input
          type="checkbox"
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
        <div className={`checkbox_area ${isChecked ? "approove" : ""}`}></div>Я
        принимаю
      </label>
      <Link href={`/terms`} locale={locale.title}>
        Условия и положения
      </Link>
    </>
  );
}
