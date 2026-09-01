import type { Thing, WithContext } from "schema-dts";

type JsonLdProps<T extends WithContext<Thing>> = {
  data: T;
};

const JsonLd = <T extends WithContext<Thing>>({ data }: JsonLdProps<T>) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default JsonLd;
