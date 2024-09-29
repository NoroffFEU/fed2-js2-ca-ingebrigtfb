import { authGuard } from "../../utilities/authGuard";
import { handleEditPost } from "../../ui/post/update";

handleEditPost();
authGuard();
