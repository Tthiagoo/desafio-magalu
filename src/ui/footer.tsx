import React from "react";

export function Footer() {
  return (
    <footer className="bg-yellow-50 text-purple-500 text-center py-6 font-nunito font-semibold text-base mt-10">
      <div>
        feito com{" "}
        <span role="img" aria-label="love" className="text-purple-500">
          💜
        </span>{" "}
        em maringá-PR
      </div>
      <div className="mt-2">
        aiqfome.com © 2007-2023 aiqfome LTDA .<br />
        CNPJ: 09.186.786/0001-58
      </div>
    </footer>
  );
}
