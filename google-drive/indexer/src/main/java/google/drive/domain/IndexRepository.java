package google.drive.domain;

import google.drive.domain.*;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="indices", path="indices")
public interface IndexRepository extends PagingAndSortingRepository<Index, Long>{

    Optional<Index> findByFileKey(String id);

    

}
