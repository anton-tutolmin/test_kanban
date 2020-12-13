import React, { useState } from 'react';

interface DescriptionProps {
  description: string;
  onUpdate(description: string): void;
}

export const PopupDescription: React.FC<DescriptionProps> = ({ description, onUpdate }) => {
  function updateDescriptionHandler(description: string) {
    onUpdate(description);
  }

  return (
    <div className="description mt-md-2">
      <div className="description__title h4">
        <strong>Description:</strong>
      </div>
      {description.length === 0 ? (
        <NoDescriptionView onSave={updateDescriptionHandler} />
      ) : (
        <HasDescriptionView description={description} onSave={updateDescriptionHandler} />
      )}
    </div>
  );
};

interface NoDescriptionViewProps {
  onSave(description: string): void;
}

const NoDescriptionView: React.FC<NoDescriptionViewProps> = ({ onSave }) => {
  const [description, setDescription] = useState<string>('');

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setDescription(e.target.value);
  }

  function saveHandler(): void {
    onSave(description);
  }

  return (
    <>
      <textarea
        className="w-100"
        value={description}
        placeholder="Add description to card..."
        onChange={changeHandler}
      />
      <button type="button" className="btn btn-success" onClick={saveHandler}>
        Save
      </button>
    </>
  );
};

interface HasDescriptionViewProps {
  description: string;
  onSave(description: string): void;
}

const HasDescriptionView: React.FC<HasDescriptionViewProps> = ({ description, onSave }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState(description);

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setNewDescription(e.target.value);
  }

  function saveHandler(): void {
    setIsUpdating(false);
    onSave(newDescription);
  }

  function cancelHandler(): void {
    setIsUpdating(false);
    setNewDescription(description);
  }

  return (
    <>
      {isUpdating ? (
        <>
          <textarea className="w-100" value={newDescription} onChange={changeHandler} />
          <button type="button" className="btn btn-success mr-md-1" onClick={saveHandler}>
            Save
          </button>
          <button type="button" className="btn btn-danger mr-md-1" onClick={cancelHandler}>
            Cancel
          </button>
        </>
      ) : (
        <div className="description__text p-md-1 rounded" onClick={() => setIsUpdating(true)}>
          {description}
        </div>
      )}
    </>
  );
};
