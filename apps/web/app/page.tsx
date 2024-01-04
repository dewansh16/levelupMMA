import { Button } from "@repo/ui";

export default function Page(): JSX.Element {
  return (
    <div className="bg-blue-600 m-1">
      <h1>Hellooooo</h1>
      <Button text="test button" variant="danger" />
    </div>
  );
}
