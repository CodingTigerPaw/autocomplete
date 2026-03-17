import { useMemo, useState, type ChangeEvent } from "react";
import { PartsList } from "./PartsList";
import "./autocomplete.css";

const Autocomplete = () => {
  const inputName: string = "parts-choice";
  //base states
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const data = useMemo(() => {
    return PartsList;
  }, []);

  const filteredOptions = value
    ? data.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase()),
      )
    : data;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsOpen(newValue.length >= 3);

    //validation errors - only if the value is not empty and not in the list
    if (newValue === "" || data.includes(newValue)) {
      setError(null);
      return;
    }
    setError(`"${newValue}" there is no part with this name in the list.`);
  };

  // currying fuction to simplified onClick handlers
  const updateValue = (val: string | null) => () => {
    setValue(val);
    setError(null);
    setIsOpen(false);
  };

  return (
    <div className="p-8 max-w-sm">
      <h3>{"Choose some parts from the list or... just write :) "}</h3>
      <label htmlFor={inputName} className="block text-sm font-medium mb-2">
        {"Choose parts:"}
      </label>

      <div className="relative">
        <div className="flex gap-2">
          <input
            id={inputName}
            value={value || ""}
            onChange={handleChange}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            placeholder="Type or select a part..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          <button
            onClick={updateValue(null)}
            className="px-3 py-1 text-sm bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition cursor-pointer"
          >
            {"Clear"}
          </button>
        </div>

        {isOpen && filteredOptions.length > 0 && (
          <div className="dropdown-list">
            {filteredOptions.map((option) => (
              <div
                key={option}
                onClick={() => updateValue(option)}
                className="dropdown-item"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {!error && (
        <p className="pt-4 mt-12 text-sm ">
          {"Selected:"} <span className="font-semibold">{value || "none"}</span>
        </p>
      )}
    </div>
  );
};

export default Autocomplete;
