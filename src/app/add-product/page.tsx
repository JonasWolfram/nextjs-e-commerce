import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import FormSubmitButton from "../components/FormSubmitButton";

export const metadata = {
  title: "Add Product - JWolfram ECommerce",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageURL")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("One or more fields are missing.");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Artikel hinzufügen</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Artikel"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Beschreibung"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Artikel Bild URL"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Preis"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">Artikel hinzufügen</FormSubmitButton>
      </form>
    </div>
  );
}