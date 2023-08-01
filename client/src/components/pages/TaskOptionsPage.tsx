// import "./TaskOptionsPage.css";

import { useContext } from "react";
import { useNavigate } from "react-router";
import { appApiUrl } from "utils";
import { AppContext } from "utils/AppContext";

export default function TaskOptionsPage() {
  const navigate = useNavigate();
  const { reloadActiveTask } = useContext(AppContext);

  async function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch(appApiUrl("/api/task"), {
      method: "post",
      body: formData,
    });

    if (response.ok) {
      reloadActiveTask();
      navigate("/active_task");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Refresh media items:
          <input
            type="checkbox"
            defaultChecked={true}
            name="refresh_media_items"
            value="true"
          />
        </label>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    </>
  );
}
