import { useGetUser, useUpdateUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import LoadingPage from "./LoadingPage";


const UserProfilePage = () => {
    const { currentUser, isLoading: isGetLoading} = useGetUser();
    const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

    if (isGetLoading) return <LoadingPage />

    if (!currentUser) return <span>Không thể tải được trang thông tin cá nhân</span>;

 return <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
}

export default UserProfilePage;