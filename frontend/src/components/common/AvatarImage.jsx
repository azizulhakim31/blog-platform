const getOriginalCloudinaryUrl = (src) => {
    const uploadPath = "/image/upload/";
    if (!src.startsWith("https://res.cloudinary.com/")) return src;

    const uploadIndex = src.indexOf(uploadPath);

    if (uploadIndex === -1) return src;

    const pathSegments = src
        .slice(uploadIndex + uploadPath.length)
        .split("/");
    const versionIndex = pathSegments.findIndex((segment) => /^v\d+$/.test(segment));

    if (versionIndex < 1) return src;

    return `${src.slice(0, uploadIndex + uploadPath.length)}${pathSegments
        .slice(versionIndex)
        .join("/")}`;
};

const AvatarImage = ({ src, alt, ...props }) => {
    if (!src) return null;

    return <img {...props} src={getOriginalCloudinaryUrl(src)} alt={alt} />;
};

export default AvatarImage;