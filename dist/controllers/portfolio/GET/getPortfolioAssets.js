"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getR2Object_1 = tslib_1.__importDefault(require("../../../services/getR2Object"));
const prisma_1 = tslib_1.__importDefault(require("../../../config/prisma"));
const getPortfolioAssets = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const promises = [
            (0, getR2Object_1.default)("hallowedvisions", "portfolioHeader.webp"),
            prisma_1.default.portfolioItems.findMany({
                include: {
                    languages: {
                        select: {
                            language: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            })
        ];
        const [profileImageUrl, portfolioProjects] = yield Promise.all(promises);
        const portfolioProjectPromises = portfolioProjects.map((project) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const imageUrl = yield (0, getR2Object_1.default)("hallowedvisions", project.imageName);
            const languagesPrimitive = project.languages;
            return {
                id: project.id,
                name: project.name,
                description: project.description,
                demoUrl: project.demoUrl,
                type: project.type,
                imageUrl: imageUrl,
                languages: languagesPrimitive.map(language => language.language.name)
            };
        }));
        const finalPortfolioProjects = yield Promise.all(portfolioProjectPromises);
        res.status(200).json({
            profileImageUrl: profileImageUrl,
            portfolioProjects: finalPortfolioProjects
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = getPortfolioAssets;
