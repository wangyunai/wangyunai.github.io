// NEXMII Lab Research Resources
// Edit this file to update the resources section of the website
// Add new resources at the beginning of the array to highlight recent releases

const labResources = [
    {
        name: "MAPSeg",
        description: "A unified domain adaptation framework for heterogeneous medical image segmentation, utilizing 3D masked autoencoding and pseudo-labeling to overcome cross-scanner variability challenges.",
        type: "Framework",
        tags: ["Neuroimaging", "Deep Learning", "Segmentation"],
        link: null, // Add GitHub or website link when available
        image: null, // Add image path when available
        year: "2024"
    },
    {
        name: "PTNet3D",
        description: "A high-resolution longitudinal infant brain MRI synthesizer based on transformers, generating detailed synthetic images to augment limited pediatric neuroimaging data.",
        type: "Algorithm",
        tags: ["Pediatric Imaging", "Transformers", "Data Augmentation"],
        link: null,
        image: null,
        year: "2024"
    },
    {
        name: "ID-Seg",
        description: "An infant deep learning-based segmentation framework designed to improve limbic structure estimates in developmental neuroimaging, with specialized architectures for pediatric applications.",
        type: "Software",
        tags: ["Infant Brain", "Segmentation", "Limbic Structures"],
        link: null,
        image: null,
        year: "2024"
    }
];

// Optionally filter resources by year or tag
function filterResourcesByYear(year) {
    return labResources.filter(item => item.year === year);
}

function filterResourcesByTag(tag) {
 