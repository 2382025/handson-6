import { UseMutateFunction } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CommentFormProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, CommentFormInput, unknown>;
  defaultInputData?: CommentFormInput;
}

export type CommentFormInput = {
  body: string;
  userId: number;
  postId?: number;
};

const CommentForm: React.FC<CommentFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentFormInput>();

  useEffect(() => {
    if (props.defaultInputData) {
      setValue("body", props.defaultInputData.body);
      setValue("userId", props.defaultInputData.userId);
      setValue("postId", props.defaultInputData.postId);
    }
  }, [props.defaultInputData, setValue]);

  const onSubmit: SubmitHandler<CommentFormInput> = (data) => {
    if (props.isEdit) {
      if (!confirm("Are you sure you want to update this comment?")) {
        return;
      }
    }
    props.mutateFn(data);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {props.isEdit ? "Edit Comment" : "Add Comment"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* User ID Input */}
          <div>
            <label className="block text-gray-700 font-semibold">User ID</label>
            <input
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400"
              type="number"
              id="userId"
              {...register("userId", { required: "User ID is required." })}
            />
            {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
          </div>

          {/* Post ID Input */}
<div>
  <label className="block text-gray-700 font-semibold">Post ID</label>
  <input
    className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400"
    type="number"
    id="postId"
    {...register("postId", { required: "Post ID is required." })}
  />
  {errors.postId && <p className="text-red-500 text-sm">{errors.postId.message}</p>}
</div>

          {/* Comment Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Comment</label>
            <textarea
              {...register("body", { required: "Comment is required" })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.body ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
              placeholder="Write your comment here..."
            ></textarea>
            {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 text-white font-bold rounded-md transition ${
                props.isEdit
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-green-500 hover:bg-green-700"
              }`}
            >
              {props.isEdit ? "Save Comment" : "Add Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
