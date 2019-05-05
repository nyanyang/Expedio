import Config from '~/Application/Config';
import BasePage from '~/Framework/Components/Page/BasePage';

class ActivatePage extends BasePage{

    constructor() {
        super();
        this.id =  '#expedio_activate'
        this.config = {
            position : 'top'
        };
        
        this.name = 'activate';
        this.el = $(this.id);
        this.loaded = false;

        this.major_proj_container = '.major-projects';
    }


    onload() {
        this.addProjectImages();

        //initialize slick/carousel
    }

    addProjectImages() {
        let carousel = $(this.major_proj_container).find('.carousel');

        Config.activate_page.major_projects.forEach((project) => {
            carousel.append(this.project_template(project));
        }) ;
    }

    project_template({img}) {
        return `<img src="${asset_path}${img}">`;
    }

}

export default ActivatePage;

