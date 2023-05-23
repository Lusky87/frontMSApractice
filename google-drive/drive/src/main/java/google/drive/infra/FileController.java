package google.drive.infra;
import google.drive.domain.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

@RestController
// @RequestMapping(value="/files")
@Transactional
public class FileController {
    @Autowired
    FileRepository fileRepository;




    @RequestMapping(value = "files/{id}/delete",
        method = RequestMethod.PUT,
        produces = "application/json;charset=UTF-8")
    public File delete(@PathVariable(value = "id") Long id, HttpServletRequest request, HttpServletResponse response) throws Exception {
            System.out.println("##### /file/delete  called #####");
            Optional<File> optionalFile = fileRepository.findById(id);
            
            optionalFile.orElseThrow(()-> new Exception("No Entity Found"));
            File file = optionalFile.get();
            file.delete();
            
            fileRepository.save(file);
            return file;
            
    }
    



}
