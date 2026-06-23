// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/form/form-input";

const testSchema = z.object({
  email: z.email("Invalid email adress"),
});

type TestFormValues = z.infer<typeof testSchema>;

function TestForm() {
  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  return (
    <form>
      <FormInput
        name="email"
        control={form.control}
        label="Email"
        type="email"
        placeholder="user@mail.com"
      ></FormInput>
    </form>
  );
}

describe("FormInput", () => {
  it("renders label and input correctlly linked via htmlfor/id", () => {
    render(<TestForm />);

    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "email");
  });

  it("has aria-invalid false and no error message initially", () => {
    render(<TestForm />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "false");
    expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument;
  });

  it("sets aria-invalid true and shows fieldError after invalid blur", async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const input = screen.getByLabelText("Email");
    await user.type(input, "not-an-email");
    await user.tab();

    await waitFor(() => {
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument;
    });
  });

  it("clears error and sets aria-invalid false once corrected", async () => {
    const user = userEvent.setup();
    render(<TestForm />);

    const input = screen.getByLabelText("Email");
    await user.type(input, "not-an-email");
    await user.tab();

    await waitFor(() => {
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    await user.clear(input);
    await user.type(input, "valid@mail.com");
    await user.tab();

    await waitFor(() => {
      expect(input).toHaveAttribute("aria-invalid", "false");
      expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument;
    });
  });

  it("passes through extra propx like placeholder and type", () => {
    render(<TestForm />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("placeholder", "user@mail.com");
    expect(input).toHaveAttribute("type", "email");
  });
});
