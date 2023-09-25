import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, schema } from "@/components/forms/validations/test";

export default function TestForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Schema> = (data) => alert(JSON.stringify(data));

  //   alert(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
      <input {...register("lastName")} />
      {errors.lastName?.message && <p>{errors.lastName?.message}</p>}
      <input {...register("email")} />
      {errors.email?.message && <p>{errors.email?.message}</p>}
      <input type="number" {...register("age")} />
      {errors.age?.message && <p>{errors.age?.message}</p>}
      <input type="submit" />
    </form>
  );
}
