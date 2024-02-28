import Image from 'next/image';
import { useEffect } from 'react';

interface InputProps extends HTMLInputElement {
  // name: 'string';
  // errors: 'string';
  //   register:
  label: string;
  setImageStr: () => void;
  image: string;
}

export function FileUploadHelper({
  register,
  label,
  name,
  errors,
  image,
  setImageStr,
  imageObj,
  ...rest
}: InputProps) {
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImageStr(reader?.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  useEffect(() => {
    if (imageObj) {
      getBase64(imageObj?.[0]);
    }
  }, [imageObj]);

  return (
    <div className="flex flex-col gap-3">
      {!image && <div className="border-[1px] p-3 text-center">No Image</div>}
      {image && <Image src={image} width={100} height={100} alt={'image'} />}
      <label htmlFor={name}>
        <input {...register(name)} {...rest} id={name} className="hidden" />
        <span className="block border rounded-lg p-2 text-center cursor-pointer">
          Edit
        </span>
      </label>
      {errors?.[name]?.message && (
        <p className="text-primary">{errors?.[name]?.message}</p>
      )}
    </div>
  );
}
