import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: ImagesListComponent,
});

function ImagesListComponent() {
  return (
    <div className="p-2">
      <h3>Images list</h3>
    </div>
  );
}
