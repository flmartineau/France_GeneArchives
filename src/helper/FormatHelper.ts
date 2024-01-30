export abstract class FormatHelper {

    /**
    * Change the commune name format to match the given format
    * @param {*} communeName the commune name
    * @param {*} format the format to apply
    * @returns the commune name with the given format
    */
    static applyFormatToCommuneName(communeName: string, format: string): string {
        switch (format) {
        case "SIMPLE_NAME" :
            return encodeURIComponent(communeName);
        case "SIMPLE_NAME_UPPERCASE" :
            return encodeURIComponent(communeName.toUpperCase());
        case "NAME_PREFIX_END":
            return encodeURIComponent(FormatHelper.formatWithPrefix(communeName));
        case "NAME_PREFIX_END_ISO88591":
            return FormatHelper.encodeISO88591(FormatHelper.formatWithPrefix(communeName));
        case "NAME_NO_ACCENTS_UPPERCASE":
            return encodeURIComponent(communeName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
        case "NAME_NO_ACCENTS_UPPERCASE_PREFIX_END":
            return encodeURIComponent(FormatHelper.formatWithPrefix(communeName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()));
        case "NAME_NO_ACCENTS_PREFIX_END":
            return encodeURIComponent(FormatHelper.formatWithPrefix(communeName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
        case "FIRST_LETTER_NAME_UPPERCASE":
            return encodeURIComponent(communeName[0].toUpperCase());
        case "FIRST_LETTER_NAME_NO_PREFIX_UPPERCASE":
            return encodeURIComponent(FormatHelper.getCommuneFirstLetter(communeName));
        default:
            return "";
        }
    }

    /**
        Encode a string to match ISO 8859-1 format
    **/
    static encodeISO88591(str: string): string {
        return str
            .replace(/\u00EA/g, '%EA')
            .replace(/\u00E2/g, '%E2')
            .replace(/\u00E8/g, '%E8')
            .replace(/\u00E9/g, '%E9')
            .replace(/\u00F4/g, '%F4')
            .replace(/ /g, '%20');
    }

    /**
        Change name format for cities names.
        Example : "Le Grand-Lemps" => "Grand-Lemps (Le)"
    **/
    static formatWithPrefix(name: string): string {
        return name.split(" ").length > 1 ? `${name.split(" ")[1]} (${name.split(" ")[0]})` : name;
    }


    /**
        Get the city's first letter for sites only allowing a letter as parameter.
    **/
    static getCommuneFirstLetter(name: string): string {
        for (let determinant of ["L'", "La ", "Le ", "Les ", "Los "]) {
            if (name.startsWith(determinant)) {
                return name.charAt(determinant.length).toUpperCase();
            }
        }
        return name.charAt(0).toUpperCase();
    }
}