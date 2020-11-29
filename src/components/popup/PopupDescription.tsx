import React, { useState } from "react";

interface DescriptionProps {
  description: string;
}

export const PopupDescription: React.FC<DescriptionProps> = (props) => {
  return (
    <div className="description mt-md-2">
      <div className="description__title h4">
        <strong>Description:</strong>
      </div>
      {props.description.length === 0 ? (
        <NoDescriptionView
          onSaveDescription={() => {
            return;
          }}
        />
      ) : (
        <HasDescriptionView
          description={props.description}
          onSaveDescription={() => {
            return;
          }}
        />
      )}
    </div>
  );
};

interface NoDescriptionViewProps {
  onSaveDescription(description: string): void;
}

const NoDescriptionView: React.FC<NoDescriptionViewProps> = (props) => {
  const [description, setDescription] = useState<string>("");

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setDescription(e.target.value);
  }

  function saveHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    // TODO
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
  onSaveDescription(description: string): void;
}

const HasDescriptionView: React.FC<HasDescriptionViewProps> = (props) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [description, setDescription] = useState(props.description);

  function changeHandler(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setDescription(e.target.value);
  }

  function saveHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    // TODO
    setIsUpdating(false);
  }

  function cancelHandler(e: React.MouseEvent<HTMLButtonElement>): void {
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
