import { describe, it, expect } from "vitest";
import { formatDisplayDate, formatFullDate } from "./dateUtils.ts";

describe("dateUtils", () => {
  describe("formatDisplayDate", () => {
    it("should format a UTC date string correctly", () => {
      const dateString = "2024-05-14T00:00:00Z";
      expect(formatDisplayDate(dateString)).toBe("May 14");
    });

    it("should format another date string correctly", () => {
      const dateString = "2023-12-01T10:30:00Z";
      expect(formatDisplayDate(dateString)).toBe("Dec 1");
    });
  });

  describe("formatFullDate", () => {
    it("should format a Date object correctly", () => {
      // Note: Month is 0-indexed in JS Date constructor (4 = May)
      const date = new Date(2024, 4, 14);
      expect(formatFullDate(date)).toBe("Tuesday, May 14, 2024");
    });

    it("should format another Date object correctly", () => {
      const date = new Date(2023, 11, 25); // 11 = December
      expect(formatFullDate(date)).toBe("Monday, December 25, 2023");
    });
  });
});
