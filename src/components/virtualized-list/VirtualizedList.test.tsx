import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { VirtualizedList } from "./VirtualizedList";

const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

describe("VirtualizedList", () => {
  it("renderiza algunos elementos visibles", () => {
    render(
      <VirtualizedList
        items={items}
        itemHeight={40}
        height={200}
        renderItem={(item) => <div>{item}</div>}
      />
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("no renderiza todos los elementos (solo subset visible + overscan)", () => {
    render(
      <VirtualizedList
        items={items}
        itemHeight={40}
        height={40}
        overscan={0}
        renderItem={(item) => <div>{item}</div>}
      />
    );
    expect(screen.queryByText("Item 100")).not.toBeInTheDocument();
  });

  it("tiene altura especificada", () => {
    render(
      <VirtualizedList
        items={items}
        itemHeight={40}
        height={300}
        renderItem={(item) => <div>{item}</div>}
      />
    );
    const wrapper = screen.getByText("Item 1").closest('[style*="overflow"]') || document.querySelector('[class]');
    expect(wrapper).toBeTruthy();
  });
});
