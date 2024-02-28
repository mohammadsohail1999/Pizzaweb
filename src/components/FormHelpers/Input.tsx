interface InputProps extends HTMLInputElement {
  // name: 'string';
  // errors: 'string';
  //   register:
  label: string;
}

export function Input({ register, label, name, errors, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input {...register(name)} {...rest} id={name} />
      {errors?.[name]?.message && (
        <p className="text-primary">{errors?.[name]?.message}</p>
      )}
    </div>
  );
}
