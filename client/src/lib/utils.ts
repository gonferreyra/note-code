import type { Code } from './types';

export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const apiUrl = import.meta.env.VITE_BASE_API_URL;

export const fetchSharedCode = async (id: string) => {
  await sleep(2000);
  const response = await fetch(`${apiUrl}/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();

  // console.log(data.code);

  return {
    // code: data.map((code: Code) => code.code),
    // language: data.map((code: Code) => code.language),
    code: data.code.code,
    language: data.code.language,
  };
};
