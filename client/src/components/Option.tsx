type OptionProps = {
  children: React.ReactNode;
  value: string;
};

export default function Option({ children, value }: OptionProps) {
  return (
    <option className="font-semibold" value={value}>
      {children}
    </option>
  );
}
