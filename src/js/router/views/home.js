import { authGuard } from "../../utilities/authGuard";
import { allPosts } from "../../ui/post/allPosts"; 
import { all } from "axios";

allPosts();
authGuard();
