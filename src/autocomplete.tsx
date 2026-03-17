import { useMemo, useState, type ChangeEvent } from "react";
import { PartsList } from "./PartsList";

const NativeAutocomplete = () => {
  const [value, setValue] = useState<string | null>(null);
  const InputName = "partsList";
  const data = useMemo(() => {
    return PartsList;
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <div className="p-8 max-w-sm">
      <label
        htmlFor="parts-choice"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Wybierz część:
      </label>

      <input
        id="parts-choice"
        list={InputName}
        value={value || ""}
        onChange={handleChange}
        placeholder="Wpisz lub wybierz..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
      />

      <datalist id={InputName}>
        {data.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>

      <p className="mt-4 text-sm text-gray-500">
        Wybrano:{" "}
        <span className="font-semibold text-gray-800">{value || "brak"}</span>
      </p>
    </div>
  );
};

export default NativeAutocomplete;
