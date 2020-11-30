import React, { useState } from "react";

interface DescriptionProps {
  description: string;
  onUpdate(description: string): void;
}

export const PopupDescription: React.FC<DescriptionProps> = (props) => {
  function updateDescriptionHandler(description: string) {
    props.onUpdate(description);
  }

  return (
    <div className="description mt-md-2">
      <div className="description__title h4">
        <strong>Description:</strong>
      </div>
      {props.description.length === 0 ? (
        <NoDescriptionView onSave={updateDescriptionHandler} />
      ) : (
        <HasDescriptionView
          description={props.description}
          onSave={updateDescriptionHandler}
        />
      )}
    </div>
  );
};

interface NoDescriptionViewProps {
  onSave(description: string): void;
}

const NoDescriptionView: React.FC<NoDescriptionViewProps> = (props) => {
  const [description, setDescription] = useState<string>("");

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setDescription(e.target.value);
  }

  function saveHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    props.onSave(description);
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

const HasDescriptionView: React.FC<HasDescriptionViewProps> = (props) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [description, setDescription] = useState(props.description);

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setDescription(e.target.value);
  }

  function saveHandler(): void {
    setIsUpdating(false);
    props.onSave(description);
  }

  function cancelHandler(): void {
    setIsUpdating(false);
    setDescription(props.description);
  }

  return (
    <>
      {isUpdating ? (
        <>
          <textarea
            className="w-100"
            value={description}
            onChange={changeHandler}
          />
          <button
            type="button"
            className="btn btn-success mr-md-1"
            onClick={saveHandler}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger mr-md-1"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </>
      ) : (
        <div
          className="description__text p-md-1 rounded"
          onClick={() => setIsUpdating(true)}
        >
          {description}
        </div>
      )}
    </>
  );
};
