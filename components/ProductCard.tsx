import { Product } from '@/types'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface iAppProps {
  product: Product;
}

const ProductCard = ({ product }: iAppProps) => {
  return (
  <div className="bg-zinc-300 gap-4 rounded-lg p-4">
    <Link href={`/products/${product._id}`} className="product-card bg-gray-300">
      <div className="product-card_img-container">
        <Image src={product.image} alt={product.title} width={200} height={200} className="product-card_img rounded-lg"/>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="product-title hover:underline-offset-2">{product.title}</h3>

        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">{product.category}</p>
          <p className="text-black text-lg font-semibold">
            <span>{product?.currency}</span>
            <span>{(product?.currentPrice / 100).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </Link>
  </div>
  )
}

export default ProductCard
