import { IBaseFilter } from "@/types";

/**
 * 1. Serialization: Converts filters object into URL SearchParams.
 * It removes empty values (undefined, null, empty string) to keep the URL clean.
 */
export function serializeFilters(filters: IBaseFilter): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    // Ignore empty values
    if (value === undefined || value === null || value === '') {
      return;
    }
    
    // Handle arrays (for future multi-select filters)
    if (Array.isArray(value)) {
      value.forEach(v => params.append(key, v.toString()));
    } else {
      params.set(key, value.toString());
    }
  });

  return params;
}

/**
 * 2. Parsing: Reads URL search params and converts them into a filters object.
 * It automatically converts known number values (e.g., page, limit) from string to number.
 */
export function parseFilters<T extends IBaseFilter>(
  searchParams: URLSearchParams, 
  defaultFilters: T
): T {
  // Start with default values, then override with values from the URL
  const parsed: any = { ...defaultFilters };

  for (const [key, value] of searchParams.entries()) {
    // Convert known number parameters
    if (key === 'page' || key === 'limit') {
      const num = Number(value);
      // Protect against illogical values (NaN)
      parsed[key] = !isNaN(num) && num > 0 ? num : defaultFilters[key];
    } else {
      parsed[key] = value;
    }
  }

  return parsed as T;
}
