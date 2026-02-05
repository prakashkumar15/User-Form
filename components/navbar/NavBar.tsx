"use client";


type NavbarProps = {
  title?: string;
};

export function Navbar({ title = "User Management" }: NavbarProps) {
  return (
    <div className="flex items-center justify-between border p-4">
      <h2 className="text-lg font-semibold">{title}</h2>

    </div>
  );
}
