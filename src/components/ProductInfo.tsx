type ProductInfoProps = {
  product_name: string;
};

export function ProductInfo(props: ProductInfoProps) {
  return <span>{props.product_name}</span>;
}
